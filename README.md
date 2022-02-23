# Tracker-website
Frontendowa część aplikacji zrealizowana w ramach przedmiotu "Wytwarzanie aplikacji internetowych i korporacyjnych" na Politechnice Warszawskiej.

Aplikacja pozwala na zbieranie statystyk ze strony internetowej, która wykorzystuje bibliotekę: https://github.com/p-karbownik/Tracker-library .

Część backendowa aplikacji znajduje się pod adresem: https://github.com/p-karbownik/Tracker-server

Uruchomienie projektu lokalnie:
- zbudowanie projektu: npm install
- uruchomienie testów: npm test
- uruchomienie testów z pokryciem kodu: npm test -- --coverage --watchAll=false
- uruchomienie projektu: npm start (projekt wstaje na porcie 3000)

Uruchomienie projektu przy użyciu Dockera:

- zbudowanie obrazu: docker build -t <nazwa_stworzonego_obrazu> .
- uruchomienie obrazu: docker run -p <port_hosta>:3000 <nazwa_stworzonego_obrazu>

Pozostali autorzy:
- Aleksandra Okrutny (https://github.com/aleokr)
- Aniela Kosek (https://github.com/aksek)
- Zuzanna Santorowska (https://github.com/HasuNoHana)
