import SwiftUI

struct Chat: Identifiable { let id = UUID(); let name: String; let message: String; let time: String }

@main
struct ChatWaveApp: App {
    var body: some Scene { WindowGroup { ContentView() } }
}

struct ContentView: View {
    let chats = [Chat(name: "Alex", message: "See you soon!", time: "10:42"), Chat(name: "College Group", message: "Project update?", time: "09:18"), Chat(name: "Mom", message: "Call me when free", time: "Yesterday")]
    var body: some View {
        NavigationStack {
            List(chats) { chat in
                NavigationLink(destination: Text(chat.name).font(.largeTitle)) {
                    HStack(spacing: 14) {
                        Circle().fill(Color.green.opacity(0.8)).frame(width: 52, height: 52).overlay(Text(String(chat.name.prefix(1))).foregroundStyle(.white).bold())
                        VStack(alignment: .leading) { Text(chat.name).font(.headline); Text(chat.message).foregroundStyle(.secondary) }
                        Spacer(); Text(chat.time).font(.caption).foregroundStyle(.secondary)
                    }.padding(.vertical, 6)
                }
            }
            .navigationTitle("ChatWave")
            .searchable(text: .constant(""), prompt: "Search")
        }
        .preferredColorScheme(.dark)
    }
}
