import {
  isUser,
  isUserDetail,
  isNote,
  isNoteList,
  isTagList,
  isContest,
  isProblem,
} from "../types/apiResponse";
import firebase from "../utils/firebase";

const API_BASE_URL = "https://apiv1.codernote.tsushiy.com";

export const fetchTypedArray = async <T>(
  typeGuardFn: (obj: T) => obj is T,
  url: string,
  init?: RequestInit
) => {
  return fetch(url, init)
    .then((res) => res.json())
    .then((array: T[]) => array.filter(typeGuardFn));
};

export const fetchTypedData = async <T>(
  typeGuardFn: (obj: T) => obj is T,
  url: string,
  init?: RequestInit
) => {
  return fetch(url, init)
    .then((res) => res.json())
    .then((obj) => {
      if (typeGuardFn(obj)) {
        return obj;
      } else {
        return Promise.reject(new Error("Fetched data type mismatched"));
      }
    });
};

export const fetchProblems = () =>
  fetchTypedArray(isProblem, `${API_BASE_URL}/problems`);
export const fetchContests = () =>
  fetchTypedArray(isContest, `${API_BASE_URL}/contests?order=-started`);

export const nonAuthGetNote = async (noteId: string) => {
  const params = new URLSearchParams({ noteId });
  const url = `${API_BASE_URL}/note?${params}`;
  return fetchTypedData(isNote, url);
};

export const getPublicNotes = async ({
  domain = "",
  problemNo = 0,
  userName = "",
  tag = "",
  limit = 100,
  skip = 0,
  order = "-updated",
}) => {
  const params = new URLSearchParams({
    domain,
    problemNo: problemNo.toString(),
    userName,
    tag,
    limit: limit.toString(),
    skip: skip.toString(),
    order,
  });
  const url = `${API_BASE_URL}/notes?${params.toString()}`;
  return fetchTypedData(isNoteList, url);
};

export const postLogin = async () => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const url = `${API_BASE_URL}/login`;
  const method = "POST";
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return fetchTypedData(isUser, url, { method, headers });
};

export const postChangeName = async (name: string) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const url = `${API_BASE_URL}/user/name`;
  const method = "POST";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Contest-Type": "application/json",
  };
  const body = JSON.stringify({
    Name: name,
  });
  return fetchTypedData(isUser, url, { method, headers, body });
};

export const getUserSetting = async () => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const url = `${API_BASE_URL}/user/setting`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return fetchTypedData(isUserDetail, url, { headers });
};

export const postUserSetting = async ({
  atcoderID = "",
  codeforcesID = "",
  yukicoderID = "",
  aojID = "",
  leetcodeID = "",
}) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const url = `${API_BASE_URL}/user/setting`;
  const method = "POST";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Contest-Type": "application/json",
  };
  const body = JSON.stringify({
    AtCoderID: atcoderID,
    CodeforcesID: codeforcesID,
    YukicoderID: yukicoderID,
    AOJID: aojID,
    LeetCodeID: leetcodeID,
  });
  return fetchTypedData(isUserDetail, url, { method, headers, body });
};

export const authGetNote = async (noteId: string) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const params = new URLSearchParams({ noteId });
  const url = `${API_BASE_URL}/user/note?${params}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return fetchTypedData(isNote, url, { headers });
};

export const getMyNote = async (problemNo: number) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const url = `${API_BASE_URL}/user/note/${problemNo}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return fetchTypedData(isNote, url, { headers });
};

export const postMyNote = async (
  problemNo: number,
  text: string,
  isPublic: boolean
) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const url = `${API_BASE_URL}/user/note/${problemNo}`;
  const method = "POST";
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const body = JSON.stringify({
    Text: text,
    Public: isPublic,
  });
  return fetchTypedData(isNote, url, { method, headers, body });
};

export const deleteMyNote = async (problemNo: number) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const url = `${API_BASE_URL}/user/note/${problemNo}`;
  const method = "DELETE";
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return fetch(url, { method, headers }).then((res) => {
    if (res.status === 200) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Failed to delete"));
    }
  });
};

export const getMyNotes = async ({
  domain = "",
  tag = "",
  limit = 100,
  skip = 0,
  order = "-updated",
}) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const params = new URLSearchParams({
    domain,
    tag,
    limit: limit.toString(),
    skip: skip.toString(),
    order,
  });
  const url = `${API_BASE_URL}/user/notes?${params.toString()}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return fetchTypedData(isNoteList, url, { headers });
};

export const getMyNoteTag = async (problemNo: number) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const url = `${API_BASE_URL}/user/note/${problemNo}/tag`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return fetchTypedData(isTagList, url, { headers });
};

export const postMyNoteTag = async (problemNo: number, tag: string) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const url = `${API_BASE_URL}/user/note/${problemNo}/tag`;
  const method = "POST";
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const body = JSON.stringify({
    Tag: tag,
  });
  return fetch(url, { method, headers, body }).then((res) => {
    if (res.status === 200) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Failed to post"));
    }
  });
};

export const deleteMyNoteTag = async (problemNo: number, tag: string) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const url = `${API_BASE_URL}/user/note/${problemNo}/tag`;
  const method = "DELETE";
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const body = JSON.stringify({
    Tag: tag,
  });
  return fetch(url, { method, headers, body }).then((res) => {
    if (res.status === 200) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Failed to delete"));
    }
  });
};
