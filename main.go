package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func HelloWorld(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "HelloWorld")
}

func handleRequests() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", HelloWorld).Methods("GET")
	log.Fatal(http.ListenAndServe(":5000", router))
}

func main() {
	fmt.Println("Go Running on Port 5000")

	handleRequests() 
}