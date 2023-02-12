# Expo2000

Aplicatie ce permite inregistrarea galeriilor pe care utilizatorul doreste sa le viziteze.

## Demo


https://user-images.githubusercontent.com/79644230/218325779-2e84a5d9-a5b5-46e2-933e-7ef0abc282df.mov


## Cerinte

1. Sa aiba mai multe rute publice si private : Routing in app-routing.module.ts . Paginile de adaugare si vizualizare a galeriilor este disponibila doar pentru utilizatorii inregistrati (rute private) , iar paginile de login si signup sunt publice.
2. Sa se foloseasca componente reutilizabile : navigation-bar este componenta reutilizata atat pe pagina de Add Expo, cat si pe All Expos.
3. Sa se comunice intre componente: Componenta reminder-alert comunica cu all-expo-page si add-expo-page.(Anunta utilizatorul o data pe zi cate galerii poate vizita in ziua respectiva.)
4. Sa fie cel putin o pagina cu un form: login, signup, add expo contin form.
5. Firebase sau orice alt mediu de backend: Firebase pentru autentificare si baza de date.
