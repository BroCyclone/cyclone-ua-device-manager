# Cyclone UA & Device Manager

A browser-based UA utility with:
- Current User-Agent viewer + copy
- Current IP detection (public IP via ipify when online)
- Current origin port detection
- TXT / JSON export
- Android / iOS / Desktop / iPad / Tablet UA generator
- Separate Custom UA Vault
- Custom UA add/edit/delete
- Custom UA entries are NOT used by the generator
- BroCyclone branding

Open `index.html` in a browser. No build step is required.

Note: Browser JavaScript cannot directly discover the device's real public IP offline; the app uses ipify when network access is available. The "Port" field reports the current page's origin port (80/443 fallback).
