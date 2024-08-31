import {Photo} from "./Photo";

export interface Member {
  id: number
  userName: string
  age: number
  photoUrl: string
  knownAs: string
  created: string
  lastAcitive: string
  gender: string
  introduction: string
  interests: string
  lookingFor: string
  city: string
  photos: Photo[]
}
