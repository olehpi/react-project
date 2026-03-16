export type PostType = {
    id: number
    message: string
    likesCount: number 
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainlink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForJob: boolean
    likesCount: number
    lookingForJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType,
    aboutMe: string
};

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
    location?: {
        city: string
        country: string
    }
};