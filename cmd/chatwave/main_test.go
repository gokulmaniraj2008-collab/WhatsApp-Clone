package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthEndpoint(t *testing.T) {
	h := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { w.WriteHeader(http.StatusOK) })
	r := httptest.NewRequest(http.MethodGet, "/api/health", nil)
	w := httptest.NewRecorder()
	h.ServeHTTP(w, r)
	if w.Code != http.StatusOK { t.Fatalf("expected 200, got %d", w.Code) }
}

func TestHubStoresMessage(t *testing.T) {
	h := newHub()
	m := h.addMessage("Gokul", "Hello")
	if m.ID != 1 || m.User != "Gokul" || m.Text != "Hello" { t.Fatalf("unexpected message: %+v", m) }
	if len(h.messages) != 1 { t.Fatalf("expected 1 message, got %d", len(h.messages)) }
}
