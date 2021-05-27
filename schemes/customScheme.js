import { LocalScheme } from '~auth/runtime'
import appwrite from '~/config/appwrite'

export default class SupabaseScheme extends LocalScheme {
    async fetchUser() {
        console.log("fetching user")

        if (appwrite.account.get() == undefined) {
            this.$auth.setUser(false)
            return
        }

        await appwrite.account.get()
            .then((response) => {
                console.log("USER", response) // Success
                this.$auth.setUser(response)
            })
            .catch(err => {
                console.log(err)
                return
            })
    }

    async logout() {
        // const supabase = this.$auth.ctx.$supabase.auth
        // await supabase.signOut()
        // return this.$auth.reset()
        console.log('session id', this.$auth.user.$id)
        await appwrite.account.deleteSession('current')
            .then(res => {
                console.log("Logged out")
                this.$auth.setUser({})
            }).catch(err => {
                console.log('Error deleting session', err)
            })
    }

    reset() {
        console.log('RESET() called')
        this.$auth.setUser(false)
    }

    async login(options) {
        const { email, password } = options

        await appwrite.account.createSession(email, password)
            .then((session) => {
                console.log('REGISTERED IN!!')
                this.$auth.setUser(session)
            })
            .catch((err) => {
                console.log(err)
                this.$auth.callOnError(error)
                return Promise.reject(error)
            })

        appwrite.account.createJWT()
            .then((res) => {
                console.log("JWT created", this.$auth.user)
                this.$auth.setUser(res)
            })
            .catch((err) => {
                console.log("error creating JWT", err)
            })
    }

    check() {
        console.log("checking user")
        const response = {
            valid: appwrite.account.get() !== undefined,
            tokenExpired: false
        }

        return response
    }
}