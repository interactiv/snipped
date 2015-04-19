/**
 * snipped is a snippet manager that allows users to manage code snippets online
 */
package main

import (
	"flag"
	"github.com/joeshaw/envdecode"
	"github.com/yvasiyarov/gorelic"
	"log"
	"net/http"
)

func main() {
	var (
		addr   *string
		config struct {
			NewRelicKey string `env:"NEW_RELIC_KEY,required"`
		}
		err   error
		agent *gorelic.Agent
	)
	addr = flag.String("addr", ":8080", "Server's address,defaults to :8080 .")
	flag.Parse()

	if err = envdecode.Decode(&config); err != nil { // get env variables
		log.Fatal(err)
	}
	agent = gorelic.NewAgent()
	agent.Verbose = true
	agent.NewrelicLicense = config.NewRelicKey
	agent.Run()
	http.ListenAndServe(*addr, http.FileServer(http.Dir("public")))
}
