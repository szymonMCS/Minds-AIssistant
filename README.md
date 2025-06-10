# Minds AIssistant

Minds AIssistant to zaawansowana aplikacja webowa do zarządzania notatkami, zintegrowana z inteligentnym asystentem AI. Umożliwia użytkownikom tworzenie, przeglądanie, edytowanie i usuwanie notatek. Kluczową funkcjonalnością jest możliwość prowadzenia rozmowy z coachem AI na temat treści zapisanych notatek, co wspiera refleksję i rozwój osobisty.

Aplikacja została zbudowana w architekturze SPA (Single Page Application) z wykorzystaniem React na frontendzie oraz serwera Express.js (Node.js) na backendzie. Całość opiera się o bazę danych PostgreSQL.

## Główne Funkcjonalności

* **Pełne Zarządzanie Notatkami (CRUD):** Tworzenie, odczyt, aktualizacja i usuwanie notatek.
* **System Uwierzytelniania:** Rejestracja i logowanie użytkowników za pomocą adresu e-mail i hasła.
* **Interaktywny Kalendarz:** Wizualizacja notatek w widoku kalendarza, ułatwiająca nawigację po zapiskach z różnych dni.
* **Asystent AI:** Możliwość rozpoczęcia rozmowy z chatbotem (coachem AI) na temat wybranej notatki w celu głębszej analizy jej treści.
* **Bezpieczeństwo:** Haszowanie haseł (bcrypt), obsługa sesji oraz ograniczanie liczby prób logowania (rate-limiting).

## Technologie

* **Frontend:**
    * **React** (v19)
    * **React Router** (v7) do nawigacji
    * **Axios** do zapytań HTTP
    * **React Bootstrap** & **MUI** do budowy interfejsu użytkownika
    * **date-fns** do operacji na datach
    * **Vite** jako narzędzie do budowy projektu

* **Backend:**
    * **Node.js** z **Express.js** jako framework serwerowy
    * **PostgreSQL** jako system zarządzania bazą danych
    * **Passport.js** (strategia `passport-local`) do autentykacji
    * **bcrypt** do haszowania haseł
    * **express-session** do zarządzania sesjami użytkowników
    * **dotenv** do zarządzania zmiennymi środowiskowymi
    * **CORS** do obsługi zapytań z innej domeny

---

## Wymagania Wstępne

* [Node.js](https://nodejs.org/) (zalecana wersja 18.x lub nowsza)
* [npm](https://www.npmjs.com/) (instalowany razem z Node.js)
* [PostgreSQL](https://www.postgresql.org/)
* Klucz API do **Google Gemini API** (do działania chatbota)

---

## Instalacja i Uruchomienie

Projekt składa się z dwóch głównych części: `client` (frontend) i `server` (backend).

### 1. Konfiguracja Backendu (`server`)

#### a) Instalacja zależności

```bash
cd "Minds AIssistant/server"
npm install
```

#### b) Konfiguracja zmiennych środowiskowych

W katalogu `server` utwórz plik `.env` i uzupełnij go swoimi danymi:

```env
# Konfiguracja bazy danych PostgreSQL
PG_USER=<twoja-nazwa-użytkownika-postgres>
PG_HOST=localhost
PG_DATABASE=<nazwa-bazy-danych>
PG_PASSWORD=<twoje-hasło-postgres>
PG_PORT=5432

# Sekret sesji
SESSION_SECRET=<dowolny-losowy-ciąg-znaków>

# Zmienne dla Google OAuth 2.0 (opcjonalnie)
GOOGLE_CLIENT_ID=<twój-google-client-id>
GOOGLE_CLIENT_SECRET=<twój-google-client-secret>
```

#### c) Konfiguracja bazy danych

1.  Upewnij się, że serwer PostgreSQL jest uruchomiony.
2.  Utwórz bazę danych (np. o nazwie `minds_aissistant_db`).
3.  Połącz się z bazą i wykonaj poniższe zapytania SQL, aby utworzyć wymagane tabele.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE notes (
    noteid SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    userid INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### d) Uruchomienie serwera

```bash
npm start
```

Serwer backendu powinien być dostępny pod adresem `http://localhost:3000`.

### 2. Konfiguracja Frontendu (`client`)

#### a) Instalacja zależności

```bash
cd "Minds AIssistant/client"
npm install
```
#### b) Konfiguracja zmiennych środowiskowych

W katalogu `client` utwórz plik `.env` i dodaj do niego swój klucz API:

```env
VITE_API_URL="[https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=TWOJ_KLUCZ_API_GEMINI](https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=TWOJ_KLUCZ_API_GEMINI)"
```
* Zastąp `TWOJ_KLUCZ_API_GEMINI` kluczem uzyskanym z Google AI Studio.

#### c) Uruchomienie aplikacji

```bash
npm run dev
```

Aplikacja kliencka powinna otworzyć się w przeglądarce pod adresem `http://localhost:5173`.

---

## Struktura Bazy Danych

### Tabela `users`

| Kolumna | Typ | Opis |
| :--- | :--- | :--- |
| `id` | SERIAL | Unikalne ID użytkownika (klucz główny) |
| `email` | VARCHAR(255) | Adres e-mail użytkownika (unikalny) |
| `password`| VARCHAR(255) | Zahaszowane hasło użytkownika |

### Tabela `notes`

| Kolumna | Typ | Opis |
| :--- | :--- | :--- |
| `noteid` | SERIAL | Unikalne ID notatki (klucz główny) |
| `title` | VARCHAR(255) | Tytuł notatki |
| `content` | TEXT | Treść notatki |
| `userid` | INTEGER | Klucz obcy do tabeli `users` |
| `created_at` | TIMESTAMP | Data utworzenia notatki |