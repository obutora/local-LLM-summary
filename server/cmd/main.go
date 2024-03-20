package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})

	r.Post("/summary", func(w http.ResponseWriter, r *http.Request) {
		params := map[string]string{}
		decoder := json.NewDecoder(r.Body)

		if err := decoder.Decode(&params); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		defer r.Body.Close()
		target := params["target"]



		url := "http://localhost:8081/api/generate"
		prompt := fmt.Sprintf("この文章を日本語で要約してください。箇条書きを使い、<div>{回答}</div>として回答すること: %s", target)
		reqString := fmt.Sprintf("{\"model\": \"elyza:7b-instruct\",\"prompt\":\"%s\",\"stream\": false}", prompt)

		payload := strings.NewReader(reqString)

		req, _ := http.NewRequest("POST", url, payload)

		req.Header.Add("Accept", "*/*")
		req.Header.Add("Content-Type", "application/json")

		res, _ := http.DefaultClient.Do(req)

		body, _ := io.ReadAll(res.Body)
		defer res.Body.Close()

		var jsonResponse map[string]interface{}
		if err := json.Unmarshal(body, &jsonResponse); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response, ok := jsonResponse["response"].(string)
		if !ok {
			http.Error(w, "Invalid response format", http.StatusBadRequest)
			return
		}

		data := map[string]string{
			"message": response,
		}
		render.JSON(w, r, data)
		})


	http.ListenAndServe(":3000", r)
}