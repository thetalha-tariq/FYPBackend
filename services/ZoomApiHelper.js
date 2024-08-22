// zoomApiHelper.js
const axios = require('axios');

class ZoomApiHelper {
  constructor() {
    this.baseUrl = 'https://api.zoom.us/v2';
    this.clientId = 'uLnJKrAKRFuVIT04rtHkVA';
    this.clientSecret = 'BI9aaJK2O8ddbfPvh40TxjjFrHYLvNwW';
    this.accountId = 'ARxefGVzTRWZEyrmPbcCGA';
  }

  async generateToken() {
    const response = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'account_credentials',
        account_id: this.accountId
      },
      auth: {
        username: this.clientId,
        password: this.clientSecret
      }
    });
    return response.data.access_token;
  }

  async createMeeting(token, meetingDetails) {
    const response = await axios.post(`${this.baseUrl}/users/me/meetings`, meetingDetails, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.join_url;
  }
}

module.exports = ZoomApiHelper;
