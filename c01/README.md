### Questions

1. Што е mongoose?
2. Како се филтрираат податоците во MongoDB, а како во mongoose?
3. Дали во mongoose имаме валидација на полињата?
4. Од што се состои Mongo конекциски стринг?

### JavaScript

## Arrays

1. find
2. map
3. filter
4. reduce
5. sort

- Spread operator in array and in an object
- Destructuring

## Modules

    1. Core
    2. Local
    3. Third party

### Web

1. MVC architecture
2. Client server architecture
3. HTTP/HTTPs
4. Status codes
   1xx - Informational - Client can proceed to send the request body
   2xx - Success
   3xx - Redirection
   4xx - Client error
   5xx - Server error

### Examples

- Направете повик до https://jsonplaceholder.typicode.com/users, потоа:

  1. Направете функција каде како параметар ќе го имаме името на некоја компанија, треба да ги најдеме сите корисници кои се дел од таа компанија
     пр. findUsersByCompany("Romaguera-Jacobson")
  2. Најдете ги сите корисници кои живеат во одреден град, според нивното корисничко име.
     пр. findUserCityByUsername("Bret") -> return "Gwenborough"

- Направете повик до https://jsonplaceholder.typicode.com/posts, потоа:

  1. Земете ги сите постови на одреден корисник според id
     пр. findUserPosts(1) -> returns [{}, {}, {}]

- Направете users.json:
  [
  {
  "id": 1,
  "name": "John",
  "age": 30,
  "gender": "male"
  },
  {
  "id": 2,
  "name": "Alice",
  "age": 25,
  "gender": "female"
  },
  {
  "id": 3,
  "name": "Bob",
  "age": 35,
  "gender": "male"
  },
  {
  "id": 4,
  "name": "Emma",
  "age": 28,
  "gender": "female"
  },
  {
  "id": 5,
  "name": "Michael",
  "age": 40,
  "gender": "male"
  },
  {
  "id": 6,
  "name": "Sophia",
  "age": 22,
  "gender": "female"
  },
  {
  "id": 7,
  "name": "David",
  "age": 32,
  "gender": "male"
  },
  {
  "id": 8,
  "name": "Emily",
  "age": 29,
  "gender": "female"
  },
  {
  "id": 9,
  "name": "Daniel",
  "age": 45,
  "gender": "male"
  },
  {
  "id": 10,
  "name": "Lily",
  "age": 27,
  "gender": "female"
  }
  ]

  1. Филтрирајте ги сите жени/мажи
  2. Пронајдете ги сите мажи постари од 30
  3. Пронајдете ги сите жени помлади од 30
  4. Пронајдете ја втората најстара жена
  5. Пронајдете го најстариот и најмладиот корисник
  6. Сортирајте ги корисниците според нивната возраст
