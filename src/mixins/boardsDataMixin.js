export default {
    methods:{
        getBoards(){
            axios.get(`${base_url}/boards?api_token=${_token}`)
                .then(({data})=>{
                    // console.log(data)
                    this.boards=data.data;
                    Event.$emit('boardsLoaded',this.boards);
                })
                .catch((data)=>{
                    console.log(data);
                    this.$router.push('/login');
                })
        }
    }
}