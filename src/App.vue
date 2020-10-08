<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center" v-if="loggedIn">
        <v-menu offset-y >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
            >
              Boards
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                    v-for="(item, index) in boards"
                    :key="index"
            >
              <router-link :to="`/boards/${item.id}`">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-title>
        <router-link to="/" tag="span" >
          <v-btn text>Page title</v-btn>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div>
        <router-link to="/login" tag="span"  v-if=" !loggedIn && this.$route.name == 'Register'">
          <v-btn text>login</v-btn>
        </router-link>

        <router-link to="/register" tag="span"  v-else-if=" !loggedIn && this.$route.name == 'LogIn'">
          <v-btn text>register</v-btn>
        </router-link>


        <v-menu text offset-y  v-if="loggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
            >
              {{user.name}}
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title v-if="loggedIn">
                <v-btn text @click="logout">logout</v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!--<v-btn text @click="logout" v-if="loggedIn">logout</v-btn>-->

      </div>

    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },
    data: () => ({
        boards: '',
        loggedIn:false,
        user:'',
    }),
    watch:{
        $route(to,from){
          this.authCheck()
      }
    },
    methods:{
        logout(){
            axios.post('http://localhost:8000/auth/logout',{api_token:_token})
                .then(({data})=>{
                    console.log(data)
                    localStorage.removeItem('_token');
                    this.$router.push('/login');
                })
                .catch((data)=>{
                    console.log(data);
                })
        },
        authCheck(){
            if(_token){
                this.loggedIn = true;
            }else{
                this.loggedIn = false;
            }
        },
        fetchUser(){
            if(_token){
                axios.get(`${base_url}/user?api_token=${_token}`)
                    .then(({data})=>{
                        this.user = data.data;
                    })
                    .catch((data)=>{
                        console.log(data);
                    })
            }
        }

    },
    created(){
       this.authCheck();
       Event.$on('boardsLoaded',(data)=>{
           this.boards = data;
       });
       this.fetchUser();

    }

};
</script>
