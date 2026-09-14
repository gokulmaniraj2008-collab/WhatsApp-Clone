// swift-tools-version: 5.9
import PackageDescription
let package = Package(name: "ChatWave", platforms: [.iOS(.v16)], products: [.executable(name: "ChatWave", targets: ["ChatWave"])], targets: [.executableTarget(name: "ChatWave")])
