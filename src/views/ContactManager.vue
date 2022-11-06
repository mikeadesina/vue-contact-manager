<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">
          Contact Manager
          <router-link to="/contacts/add" class="btn btn-success btn-sm"><i class="fa fa-plus"></i> New</router-link>
        </p>
        <p class="fst-italic">
          This is a crud  contact manager with vue js and node js 
        </p>
        <form>
          <div class="row">
            <div class="col-md-6">
              <div class="row">
                <div class="col">
                  <!-- <input
                    type="text"
                    class="form-control"
                    placeholder="Search Name"
                  /> -->
                  <select class="form-control" v-model="groupId" name="group" placeholder="Select your Group"
                    v-if="groups.length > 0">
                    <option value="">Select Group</option>
                    <option :value="group.id" v-for="group in groups" :key="group.id">
                      {{ group.name }}
                    </option>
                  </select>
                </div>
                <div class="col">
                  <input type="button" @click="searchContactByGroup" class="btn btn-outline-dark"  value="Search"/>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- <pre>{{contacts}}</pre> -->
  <!-- spinner -->
  <div v-if="loading">
    <div class="container">
      <div class="row">
        <div class="col">
          <Spinner />
        </div>
      </div>
    </div>
  </div>
  <!-- error message -->
  <div v-if="loading && errorMessage">
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h4 text-danger fw-bold">{{ errorMessage }}</p>
          >
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-3" v-if="contacts.length > 0">
    <div class="row">
      <div class="col-md-6" v-for="contact of contacts" :key="contact.id">
        <div class="card my-2 list-group-item-success shadow-lg">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-sm-4">
                <img :src="contact.photo" alt="" class="contact-img" />
              </div>
              <div class="col-md-7">
                <ul class="list-group">
                  <li class="list-group-item">
                    Name : <span class="fw-bold">{{ contact.name }}</span>
                  </li>
                  <li class="list-group-item">
                    Email : <span class="fw-bold">{{ contact.email }}</span>
                  </li>
                  <li class="list-group-item">
                    Mobile : <span class="fw-bold">{{ contact.mobile }}</span>
                  </li>
                </ul>
              </div>
              <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                <router-link :to="`/contacts/view/${contact.id} `" class="btn btn-warning my-1">
                  <i class="fa fa-eye"></i>
                </router-link>
                <router-link :to="`/contacts/edit/${contact.id} `" class="btn btn-warning my-1">
                  <i class="fa fa-pen"></i>
                </router-link>
                <button class="btn btn-danger my-1" @click="clickDeleteContact(contact.id)">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <pre>{{ groupId }}</pre> -->
</template>

<script>
import { ContactService } from "@/service/Contactservice";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "ContactManager",
  components: { Spinner },
  data: function () {
    return {
      loading: false,
      contacts: [],
      groups: [],
      errorMessage: null,
      groupId: '',
    };
  },
  created: async function () {
    try {
      this.loading = true;
      let response = await ContactService.getAllContacts();
      this.contacts = response.data;
      let groupResponse = await ContactService.getAllGroups();
      this.groups = groupResponse.data;
      this.loading = false;
    } catch (error) {
      this.errorMessage = error;
      this.loading = false;
    }
  },
  methods: {
    clickDeleteContact: async function (contactId) {
      try {
        this.loading = true;
        let response = await ContactService.deleteContact(contactId);
        if (response) {
          let response = await ContactService.getAllContacts();
          this.contacts = response.data;
          this.loading = false;
        }
      } catch (error) {
        this.errorMessage = error;
        this.loading = false;
      }
    },
    searchContactByGroup: function() {
      let searchList=this.contacts.filter(contact => (contact.groupId == this.groupId));
      if (searchList.length == 0) {
        alert("No Record Found")
        this.errorMessage = "No Record Found";
        this.loading = false;
      }
      this.contacts=searchList;
      console.log(searchList);
    }
  },
};
</script>
<style scoped>

</style>
