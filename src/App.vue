<template lang="pug">
  div
    //- p {{ Topic }}
    hr
    //- p {{ Subtopic }}
    hr
    p {{ allTesting123s }}
    hr
    input(v-model="userInput" type="number")
    hr
    button(@click="createNewTesting" label="click") Huzah!

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
const Subtopic = gql`
  query Subtopic($ID: String!, $includeTopic: Boolean!) {
    Subtopic(subtopicID: $ID) {
      subtopicID
      translations {
        title
        essentialIdea
      }
      hours
      topic @include(if: $includeTopic) {
        id,
        topicIDNumber,
        translations {
          title
        }
      }
    }
  }
`

const subtopicInput = {
}

const allTesting123s = gql`
  query {
    allTesting123s {
      id,
      someNumberField
    }
  }
`
const CREATE_NEW_TESTING123 = gql`
mutation createTest($num: Int!) {
  createTesting123(
    someNumberField: $num,
    isPublished: true
  ) {
    id
    someNumberField
    isPublished
  }
}
`

export default {
  name: 'app',
  data () {
    return {
      msg: 'try',
      loading: 0,
      userInput: 0
    }
  },
  methods: {
    createNewTesting () {
      this.$apollo.mutate({
        mutation: CREATE_NEW_TESTING123,
        variables: {
          num: parseInt(this.userInput)
        }
      })

      console.log('num added')
    }
  },
  apollo: {
    $loadingKey: 'loading',
    // Topic: {
    //   query: Topic,
    //   variables: {
    //     // skip: 0,
    //     ID: "1",
    //     includeSubtopics: true
    //   }
    // },
    // Subtopic: {
    //   query: Subtopic,
    //   variables: {
    //     // skip: 0,
    //     ID: "1.1",
    //     includeTopic: true
    //     // includeSubSubtopics: true
    //   }
    // }
    allTesting123s: { 
      query: allTesting123s
    }
  },
}
</script>

<style lang="scss">
</style>
