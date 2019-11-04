
export default {
  computed: {
    
  },
  methods: {
    getExcle(url, data) {
      if (data) {
        
        this.$http.get(url, {
          params: {
            ...data
          }
        }).then((res) => {
          if (res.code == '200') {
          }
        })
      } else {
        this.$http.get(url).then((res) => {
          if (res.code == '200') {
          }
        })
      }
      
    }
  },
}
