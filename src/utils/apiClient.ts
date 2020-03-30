import { isUser, isUserDetail, isNote, isNoteList, isTagList, isContest, isProblem } from "../types/apiResponse";
import firebase from "../utils/firebase";

const API_BASE_URL = 'https://apiv1.codernote.tsushiy.com';

const fetchTypedArray = async <T>(url: string, typeGuardFn: (obj: any) => obj is T) => {
  return fetch(url)
    .then(res =>res.json())
    .then((array: any[]) => array.filter(typeGuardFn))
};

export const fetchProblems = () => fetchTypedArray(`${API_BASE_URL}/problems`, isProblem);
export const fetchContests = () => fetchTypedArray(`${API_BASE_URL}/contests?order=-started`, isContest);

export const nonAuthGetNote = async (noteId: string) => {
  const params = new URLSearchParams({noteId})
  const url = `${API_BASE_URL}/note?${params}`;
  return fetch(url)
    .then(res => res.json())
    .then(note => {
      if (isNote(note)) {
        return note;
      }
    })
}

export const getPublicNotes = async (domain: string, problemNo: number, userName: string, tag: string) => {
  const params = new URLSearchParams({
    domain,
    problemNo: problemNo.toString(),
    userName,
    tag
  })
  const url = `${API_BASE_URL}/notes?${params.toString()}`;
  return fetch(url)
    .then(res => res.json())
    .then(noteList => {
      if (isNoteList(noteList)) {
        return noteList;
      }
    })
}

export const postLogin = async () => {
  const token = await firebase.auth().currentUser?.getIdToken()
  const url = `${API_BASE_URL}/login`;
  const method = "POST";
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  return fetch(url, {method, headers})
    .then(res => res.json())
    .then(user => {
      if (isUser(user)) {
        return user;
      }
    })
}

export const postChangeName = async (name: string) => {
  const token = await firebase.auth().currentUser?.getIdToken()
  const url = `${API_BASE_URL}/user/name`;
  const method = "POST";
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Contest-Type": 'application/json'
  }
  const body = JSON.stringify({
    Name: name
  })
  return fetch(url, {method, headers, body})
    .then(res => res.json())
    .then(user => {
      if (isUser(user)) {
        return user;
      }
    })
}

export const getUserSetting = async () => {
  const token = await firebase.auth().currentUser?.getIdToken()
  const url = `${API_BASE_URL}/user/setting`;
  const headers = {
    "Authorization": `Bearer ${token}`,
  }
  return fetch(url, {headers})
    .then(res => res.json())
    .then(userDetail => {
      if (isUserDetail(userDetail)) {
        return userDetail;
      }
    })
}

export const postUserSetting = async (
  atcoderId: string, codeforcesId: string, yukicoderId: string, aojId: string, leetcodeId: string) => {
  const token = await firebase.auth().currentUser?.getIdToken()
  const url = `${API_BASE_URL}/user/setting`;
  const method = "POST";
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Contest-Type": 'application/json'
  }
  const body = JSON.stringify({
    AtCoderID: atcoderId,
    CodeforcesID: codeforcesId,
    YukicoderID: yukicoderId,
    AOJID: aojId,
    LeetCodeID: leetcodeId
  })
  return fetch(url, {method, headers, body})
    .then(res => res.json())
    .then(userDetail => {
      if (isUserDetail(userDetail)) {
        return userDetail;
      }
    })
}

export const authGetNote = async (noteId: string) => {
  const token = await firebase.auth().currentUser?.getIdToken()
  const params = new URLSearchParams({noteId})
  const url = `${API_BASE_URL}/user/note?${params}`;
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  return fetch(url, {headers})
    .then(res => res.json())
    .then(note => {
      if (isNote(note)) {
        return note;
      }
    })
}

export const getMyNote = async (problemNo: number) => {
  const token = await firebase.auth().currentUser?.getIdToken()
  const url = `${API_BASE_URL}/user/note/${problemNo}`;
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  return fetch(url, {headers})
    .then(res => res.json())
    .then(note => {
      if (isNote(note)) {
        return note;
      }
    })
}

export const postMyNote = async (problemNo: number, text: string, isPublic: boolean) => {
  const token = await firebase.auth().currentUser?.getIdToken()
  const url = `${API_BASE_URL}/user/note/${problemNo}`;
  const method = "POST";
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  const body = JSON.stringify({
    Text: text,
    Public: isPublic
  })
  return fetch(url, {method, headers, body})
}

export const getMyNotes = async (domain: string, tag: string) => {
  const token = await firebase.auth().currentUser?.getIdToken()
  const params = new URLSearchParams({
    domain,
    tag
  })
  const url = `${API_BASE_URL}/user/notes?${params.toString()}`;
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  return fetch(url, {headers})
    .then(res => res.json())
    .then(noteList => {
      if (isNoteList(noteList)) {
        return noteList;
      }
    })
}

export const getMyNoteTag = async (problemNo: number) => {
  const token = await firebase.auth().currentUser?.getIdToken()
  const url = `${API_BASE_URL}/user/note/${problemNo}/tag`;
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  return fetch(url, {headers})
    .then(res => res.json())
    .then(tags => {
      if (isTagList(tags)) {
        return tags;
      }
    })
}

export const postMyNoteTag = async (problemNo: number, tag: string) => {
  const token = await firebase.auth().currentUser?.getIdToken()
  const url = `${API_BASE_URL}/user/note/${problemNo}/tag`;
  const method = "POST";
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  const body = JSON.stringify({
    Tag: tag,
  })
  return fetch(url, {method, headers, body})
}

export const deleteMyNoteTag = async (problemNo: number, tag: string) => {
  const token = await firebase.auth().currentUser?.getIdToken()
  const url = `${API_BASE_URL}/user/note/${problemNo}/tag`;
  const method = "DELETE";
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  const body = JSON.stringify({
    Tag: tag,
  })
  return fetch(url, {method, headers, body})
}