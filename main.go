/**
 * snipped is a snippet manager that allows users to manage code snippets online
 */
package main

import (
	"flag"
	"fmt"
	"github.com/joeshaw/envdecode"
	"github.com/yvasiyarov/gorelic"
	"log"
	"net/http"
)

func main() {
	var (
		addr   *string
		config struct {
			NewRelicKey string `env:"NEW_RELIC_KEY"`
		}
		args struct {
			debug *bool
		}
		err   error
		agent *gorelic.Agent
	)
	addr = flag.String("addr", ":8080", "Server's address,defaults to :8080 .")
	args.debug = flag.Bool("debug", false, "App debug mode")
	flag.Parse()

	if err = envdecode.Decode(&config); err != nil { // get env variables
		log.Fatal(err)
	}
	if config.NewRelicKey != "" {
		agent = gorelic.NewAgent() // set up new relic
		agent.Verbose = true
		agent.NewrelicLicense = config.NewRelicKey
		agent.Run()
	}
	server := http.NewServeMux()
	server.HandleFunc("/", func(rw http.ResponseWriter, req *http.Request) {
		fmt.Fprint(rw, "Hello World")
	})
	server.Handle("/public", http.FileServer(http.Dir("public")))
	log.Printf("Listening on : %s \n", *addr)
	if err = http.ListenAndServe(*addr, server); err != nil {
		log.Fatal(err)
	}
}
