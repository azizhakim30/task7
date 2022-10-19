package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"text/template"

	"github.com/gorilla/mux"
)

func handleRequests() {
	route := mux.NewRouter()

	// router path folder untuk public
	route.PathPrefix("/public/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))

	// routing
	route.HandleFunc("/hello", HelloWorld).Methods("GET")
	route.HandleFunc("/", Home).Methods("GET")
	route.HandleFunc("/contact", Contact).Methods("GET")
	route.HandleFunc("/formProject", formProject).Methods("GET")
	route.HandleFunc("/detailProject/{Id}", DetailProject).Methods("GET")
	route.HandleFunc("/addProject", addProject).Methods("POST")


	fmt.Println("Go Running on Port 5000")
	http.ListenAndServe(":5000", route)
}

func HelloWorld(w http.ResponseWriter, r *http.Request){
	w.Write([]byte("Hello World"))
}

func Home(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Contect-Type", "text/html; charset=utf-8")

	var tmpl, err = template.ParseFiles("views/index.html")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("message : " + err.Error()))
		return
	}
	
	w.WriteHeader(http.StatusOK)
	tmpl.Execute(w, nil)
}

func Contact(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Contect-Type", "text/html; charset=utf-8")

	var tmpl, err = template.ParseFiles("views/contact.html")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("message : " + err.Error()))
		return
	}
	
	w.WriteHeader(http.StatusOK)
	tmpl.Execute(w, nil)
}

func formProject(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Contect-Type", "text/html; charset=utf-8")

	var tmpl, err = template.ParseFiles("views/addProject.html")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("message : " + err.Error()))
		return
	}
	
	w.WriteHeader(http.StatusOK)
	tmpl.Execute(w, nil)
}

func DetailProject(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Contect-Type", "text/html; charset=utf-8")

	var tmpl, err = template.ParseFiles("views/detailProject.html")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("message : " + err.Error()))
		return
	}
	
	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	data := map[string]interface{} {
		"Title" : "Pasar Coding di Indonesia",
		"Content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, autem nostrum. Nihil fugiat voluptatum ipsam dicta voluptas recusandae quod iste inventore. A ipsa beatae mollitia esse, facilis dolore hic praesentium!",
		"Id": id, 
	}

	w.WriteHeader(http.StatusOK)
	tmpl.Execute(w, data)
}


func addProject(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Fatal(err)
	}

	//get didapatkan dari tag inputan
	fmt.Println("Title : " + r.PostForm.Get("inputName")) 
	fmt.Println("Start Date : " + r.PostForm.Get("inputStartDate"))
	fmt.Println("End Date : " + r.PostForm.Get("inputEndDate"))
	fmt.Println("Content : " + r.PostForm.Get("inputDesc"))
	fmt.Println("Icon1 : " + r.PostForm.Get("checkboxNodeJs"))
	fmt.Println("Icon2 : " + r.PostForm.Get("checkboxReactJs"))
	fmt.Println("Icon3 : " + r.PostForm.Get("checkboxJavaScript"))
	fmt.Println("Icon4 : " + r.PostForm.Get("checkboxVueJs"))

	
	http.Redirect(w,r, "/formProject", http.StatusMovedPermanently)
}
func main() {
	handleRequests() 
}