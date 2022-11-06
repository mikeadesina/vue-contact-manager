<template>
   <!-- spinner -->
  <div v-if="loading">
  <div class="container">
    <div class="row">
      <div class="col">
        <Spinner/>
      </div>
    </div>
  </div>
  </div>
<!-- error message -->
  <div v-if="loading && errorMessage">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h4 text-danger fw-bold">{{errorMessage}}</p>>
      </div>
    </div>
  </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Edit Contact</p>
        <p class="fst-italic">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dicta
          dolores, excepturi harum impedit maiores similique sint soluta vel?
          Asperiores consectetur dolores fuga fugit iste labore laborum quos
          unde voluptate.
        </p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="updateSubmit()">
          <div class="mb-2">
            <input
              type="text"
              v-model="contact.name"
              class="form-control"
              placeholder="Enter your Name"
            />
          </div>
          <div class="mb-2">
            <input
              type="text"
              v-model="contact.photo"
              class="form-control"
              placeholder="Enter your Photo Url"
            />
          </div>
          <div class="mb-2">
            <input
              type="text"
              v-model="contact.email"
              class="form-control"
              placeholder="Enter your Email"
            />
          </div>
          <div class="mb-2">
            <input
              type="text"
              v-model="contact.mobile"
              class="form-control"
              placeholder="Enter your Mobile"
            />
          </div>
          <div class="mb-2">
            <input
              type="text"
              v-model="contact.company"
              class="form-control"
              placeholder="Enter your Company"
            />
          </div>
          <div class="mb-2">
            <input
              type="text"
              v-model="contact.title"
              class="form-control"
              placeholder="Enter your Title"
            />
          </div>
          <div class="mb-2">
            <select
              class="form-control"
              v-model="contact.groupId"
              name="group"
              placeholder="Select your Group"
              v-if="groups.length > 0"
            >
              <option value="">Select</option>
              <option :value="group.id" v-for="group in groups" :key="group.id">
                {{ group.name }}
              </option>
            </select>
          </div>
          <div class="mb-2">
            <input type="submit" class="btn btn-success" value="Update" />
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
          alt=""
          class="contact-img"
        />
      </div>
    </div>
  </div>
  <!-- <pre>{{ contact }}</pre> -->
</template>

<script>
import { ContactService } from "@/service/Contactservice";
import Spinner from '@/components/Spinner.vue';
export default {
  name: "EditContact",
  components: {Spinner},
  data: function () {
    return {
      contactId: this.$route.params.contactId,
      loading: false,
      contact: {
        name: "",
        photo: "",
        email: "",
        mobile: "",
        company: "",
        title: "",
        groupId: "",
      },
      errorMessage: "null",
      groups: [],
    };
  },
  created: async function () {
    try {
      this.loading = true;
      console.log(this.contact);
      let response = await ContactService.getContact(this.contactId);
      this.contact = response.data;
      let groupResponse = await ContactService.getAllGroups();
      this.groups = groupResponse.data;
      console.log(
        this.$route.params.contactId,
        response.data,
        groupResponse.data,
        this.contact
      );
      this.loading = false;
    } catch (error) {
      this.errorMessage = error;
      this.loading = false;
    }
  },
  methods: {
    updateSubmit: async function () {
      try {
        let response = await ContactService.updateContact(
          this.contact,
          this.contactId
        );
        if (response) {
          return this.$router.push("/");
        } else {
          return this.$router.push(`/contacts/edit/${this.contactId}`);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
