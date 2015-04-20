/**
 * snipped is a snippet manager that allows users to manage code snippets online
 */
package main

import (
	"flag"
	"fmt"
	"github.com/gorilla/mux"
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
			debug            *bool
			newRelicDisabled *bool
		}
		err                   error
		agent                 *gorelic.Agent
		router                *mux.Router
		snippetRestController *GenericRestController
	)
	addr = flag.String("addr", ":8080", "Server's address,defaults to :8080 .")
	args.debug = flag.Bool("debug", false, "App debug mode")
	args.newRelicDisabled = flag.Bool("disableNR", true, "Disable new relic analytics.")
	flag.Parse()

	if err = envdecode.Decode(&config); err != nil { // get env variables
		log.Fatal(err)
	}
	// New Relic
	if config.NewRelicKey != "" && !*args.newRelicDisabled {
		agent = gorelic.NewAgent() // set up new relic
		agent.Verbose = true
		agent.NewrelicLicense = config.NewRelicKey
		agent.Run()
	}
	// Routing
	router = mux.NewRouter().StrictSlash(false)
	// Snippet
	snippetRestController = new(GenericRestController)
	snippetRestController.reqVarsFunc = mux.Vars
	snippetRestController.Provide(router.PathPrefix("/snippet").Subrouter())
	router.Handle("/public", http.FileServer(http.Dir("public")))
	log.Printf("Listening on %s \n", *addr)
	if err = http.ListenAndServe(*addr, router); err != nil {
		log.Fatal(err)
	}
}

/****************************************/
/*              CONTROLLERS             */
/****************************************/
type RestController interface {
	Get(http.ResponseWriter, *http.Request)
	Post(http.ResponseWriter, *http.Request)
	Delete(http.ResponseWriter, *http.Request)
	Put(http.ResponseWriter, *http.Request)
	Index(http.ResponseWriter, *http.Request)
	Provide(*mux.Router)
}

type GenericRestController struct {
	reqVarsFunc  func(r *http.Request) map[string]string
	resourceName string
	model        interface{}
	service      interface{}
}

// Get gets a resource
func (s *GenericRestController) Get(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprint(rw, "get", s.reqVarsFunc(r)["id"])
}

// Delete deletes a ressource by id
func (s *GenericRestController) Delete(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprint(rw, "delete", s.reqVarsFunc(r)["id"])
}

// Put replaces a resource by id
func (s *GenericRestController) Put(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprint(rw, "update", s.reqVarsFunc(r)["id"])
}

// Index lists resources
func (s *GenericRestController) Index(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprint(rw, "index")
}

// Post creates a new resource
func (s *GenericRestController) Post(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprint(rw, "post")
}

// Provide plugs the controllers into gorilla/mux
func (s *GenericRestController) Provide(router *mux.Router) {

	//singular
	router.Methods("DELETE").Path("/{id}").HandlerFunc(s.Delete)
	router.Methods("PUT").Path("/{id}").HandlerFunc(s.Put)
	router.Methods("GET").Path("/{id}").HandlerFunc(s.Get)
	//collection
	router.Methods("GET").HandlerFunc(s.Index)
	router.Methods("POST").HandlerFunc(s.Post)
}
