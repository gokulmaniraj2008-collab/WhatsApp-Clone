package main

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

type Message struct {
	ID        int64  `json:"id"`
	User      string `json:"user"`
	Text      string `json:"text"`
	Timestamp string `json:"timestamp"`
}

type Hub struct {
	mu      sync.RWMutex
	clients map[*websocket.Conn]bool
	messages []Message
	nextID  int64
}

var upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}

func newHub() *Hub { return &Hub{clients: make(map[*websocket.Conn]bool)} }

func (h *Hub) addMessage(user, text string) Message {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.nextID++
	m := Message{ID: h.nextID, User: user, Text: text, Timestamp: time.Now().UTC().Format(time.RFC3339)}
	h.messages = append(h.messages, m)
	if len(h.messages) > 100 { h.messages = h.messages[len(h.messages)-100:] }
	return m
}

func (h *Hub) broadcast(m Message) {
	data, _ := json.Marshal(m)
	h.mu.RLock()
	defer h.mu.RUnlock()
	for c := range h.clients { _ = c.WriteMessage(websocket.TextMessage, data) }
}

func (h *Hub) messagesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet { http.Error(w, "method not allowed", http.StatusMethodNotAllowed); return }
	h.mu.RLock(); defer h.mu.RUnlock()
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(h.messages)
}

func (h *Hub) wsHandler(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil { return }
	h.mu.Lock(); h.clients[c] = true; h.mu.Unlock()
	defer func() { h.mu.Lock(); delete(h.clients, c); h.mu.Unlock(); _ = c.Close() }()

	for {
		var in struct { User string `json:"user"`; Text string `json:"text"` }
		if err := c.ReadJSON(&in); err != nil { return }
		if in.Text == "" { continue }
		m := h.addMessage(in.User, in.Text)
		h.broadcast(m)
	}
}

func main() {
	hub := newHub()
	tpl := template.Must(template.ParseFiles("web/index.html"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) { _ = tpl.Execute(w, nil) })
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("web/static"))))
	http.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"status":"ok","service":"chatwave-go"}`))
	})
	http.HandleFunc("/api/messages", hub.messagesHandler)
	http.HandleFunc("/ws", hub.wsHandler)

	log.Println("ChatWave Go listening on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
