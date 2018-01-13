<template lang="pug">
  h1 {{ Topic }}
</template>

<script>

import gql from 'graphql-tag'

const Topic = gql`
  query Topic($ID: String!, $includeSubtopics: Boolean!) {
    Topic(topicIDNumber: $ID) {
      id
      hours
      translations {
        title
      }
      subtopics @include(if: $includeSubtopics) {
        subtopicID
        translations {
          title
          essentialIdea
        }
      }
    }
  }

`

export default {
  name: 'app',
  data () {
    return {
      msg: 'try',
      loading: 0
    }
  },
  apollo: {
    $loadingKey: 'loading',
    Topic: {
      query: Topic,
      variables: {
        skip: 0,
        ID: "1",
        includeSubtopics: true
      }
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
