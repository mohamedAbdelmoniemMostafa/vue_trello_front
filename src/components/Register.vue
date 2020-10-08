<template>
  <div class="text-md-center">
    <h2>Register</h2>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-card>
          <v-card-text>
            <v-text-field v-model="register.name" label="Name" required></v-text-field>
            <v-text-field v-model="register.email" label="E-mail" required></v-text-field>
            <v-text-field v-model="register.password" type="password" label="Password" required></v-text-field>
            <v-btn class="mr-4 info"  @click="submit" >
              Register
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>

  export default {
      name: 'Register',
      data: () => ({
          register:{
              name: '',
              email: '',
              password: '',
          }
      }),
      methods:{
          submit(){
            axios.post(`$_base_url}/auth/register'`,this.register)
                .then(({data})=>{
                    console.log(data);
                    let token = data.data.api_token;
                    localStorage.setItem('_token', token);
                    this.$router.push('/');

                })
                .catch((data)=>{
                    console.log(data);
                })

          }
      },

  }
</script>
