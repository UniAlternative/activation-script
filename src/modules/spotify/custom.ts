// *://audio-ak-spotify-com.akamaized.net/*$header=content-range:/\/\d\d\d\d\d\d$/,redirect=noop-0.5s.mp3
// *://audio-akp-quic-spotify-com.akamaized.net/*$header=content-range:/\/\d\d\d\d\d\d$/,redirect=noop-0.5s.mp3
// *://audio-fa.scdn.co/*$header=content-range:/\/\d\d\d\d\d\d$/,redirect=noop-0.5s.mp3
// *://creativeservice-production.scdn.co/*$header=content-range:/\/\d\d\d\d\d\d$/,redirect=noop-0.5s.mp3

import { buildResponse, httpClient, sendNotification } from "../../utils";


/**
 * @url audio-ak-spotify-com.akamaized.net
 * @url audio-akp-quic-spotify-com.akamaized.net
 * @url audio-fa.scdn.co
 * @url creativeservice-production.scdn.co
 * 
 * @redirect https://raw.githubusercontent.com/texnikru/blank-mp3s/master/1sec.mp3
 */
export function spotifyRemoveAds() {
  sendNotification("Spotify Remove Ads", "请求 MP3", "");
  const mp3 = "https://raw.githubusercontent.com/texnikru/blank-mp3s/master/1sec.mp3";

  httpClient.get({ url: mp3 }, (error, response, data) => {
    if (error) {
      sendNotification("Spotify Remove Ads", "MP3 请求失败", error);
      return buildResponse({ 
        status: 500,
        body: error
      });
    }
    buildResponse({
      status: response.status,
      headers: response.headers,
      body: data,
    });
  })
}