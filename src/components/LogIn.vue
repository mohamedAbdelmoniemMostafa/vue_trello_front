<template>
  <div class="text-md-center">
    <h2>LogIn</h2>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-card @keyup.enter="submit">
          <v-card-text>
            <v-text-field v-model="login.email" type="email" label="E-mail" required></v-text-field>
            <v-text-field v-model="login.password" type="password" label="Password" required></v-text-field>
            <v-btn class="mr-4 success" @click="submit">
              LogIn
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>

    export default {
        name: 'LogIn',
        data: () => ({
            login:{
                email: '',
                password: '',
            }
        }),
        methods:{
            submit(){
                axios.post('http://localhost:8000/auth/login',this.login)
                    .then(({data})=>{
                        console.log(data);
                        let token = data.data.api_token;
                        let user = data.data;
                        localStorage.setItem('_token', token);
                        localStorage.setItem('user', JSON.stringify(user));
                        _token = token;
                        this.$router.push('/');
                    })
                    .catch((data)=>{
                        console.log(data);
                    })

            }
        },
        mounted(){
        }

    }
</script>
