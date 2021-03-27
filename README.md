Uruchomienie projektu lokalnie:
- zbudowanie projektu: npm install
- uruchomienie testów: npm test
- uruchomienie projektu: npm start (projekt wstaje na porcie 3000)

Uruchomienie projektu przy użyciu Dockera (wymagany zainstalowany Docker):

- zbudowanie obrazu: docker build -t <nazwa_stworzonego_obrazu> .
- uruchomienie obrazu: docker run <nazwa_stworzonego_obrazu>
- obraz uruchamia się domyślnie na porcie 3000, w celu zmienienia portu należy dodać w komendzie uruchmiającej dockera opcje -p<nowy_port>:3000
