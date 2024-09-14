const state = () => ({});

const getters = {};

const mutations = {};

const actions = {
  nuxtServerInit({ commit }, { req, $gates }) {
    const user = req.session.user;
    if (user) {
      $gates.setRoles(user.roles);
      $gates.setPermissions(user.permissions);

      commit("user", user);
    }
  }
};

export default {
  actions,
  mutations,
  getters,
  state
};
