<script>
import Vue from 'vue';
import draggable from 'vuedraggable';

// https://github.com/SortableJS/Vue.Draggable

// USE IT!!!!!!
// http://element.eleme.io/

export default Vue.component('question-list', {
  props: {
    questionList: {
      type: Array,
      required: true,
    },
  },

  components: {
    draggable,
  },

  methods: {
    onRemove(questionId) {
      this.$store.dispatch('questions/removeQuestion', questionId);
    },
    onEdit(questionId) {
      this.$store.dispatch('questions/editQuestion', questionId);
    },
  },

  render() {
    return (
      <ul>
        <draggable>
          {this.questionList.map(question => (
            <li key={question._id} class="list-group-item">
              <div class="text-right">
                {question.labels.map(label => (
                  <span
                    class="badge badge-success"
                    key={label.text}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <p class="text-left">{question.text}</p>

              <div class="text-right">
                <span
                  onClick={() => this.onEdit(question._id)}
                  class="badge badge-primary badge-pill book-close-btn"
                >
                  edit
                </span>

                <span
                  onClick={() => this.onRemove(question._id)}
                  class="badge badge-primary badge-pill book-close-btn"
                >
                  remove
                </span>
              </div>
            </li>
          ))}
        </draggable>
      </ul>
    );
  },
});
</script>
