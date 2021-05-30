import { LocalScheme } from '~auth/runtime'
import { Appwrite } from 'appwrite'
import sdk from '~/config/appwrite'

export default class AppwriteScheme extends LocalScheme {
    async fetchUser() {
        console.log("Fetching User")


        // let jwt = JSON.parse(localStorage.getItem('auth._token.customStrategy'))?.jwt

        let jwt = this.$auth.strategy.token.get()

        console.log(jwt)

        let customUser = {
            user: {
                name: "Aus"
            }
        }
        this.$auth.setUser(customUser)

    }

    async logout() {
        // console.log('session id', this.$auth.user.$id)
        console.log("Logout")

        await sdk.account.deleteSession('current')
            .then(() => this.reset())
            .catch((e) => console.log(e))

        return

    }

    reset() {
        console.log('reset called')
        this.$auth.strategy.token.reset()
        this.$auth.setUser(false)
    }

    async setToken() {
        console.log('setting token')
        await appwrite.account.createJWT()
            .then((jwt) => {
                this.$auth.strategy.token.set(jwt)
            })
    }

    async login(options) {
        console.log("calling login on scheme")
        const { email, password } = options


        await appwrite.account.createSession(email, password).then((session) => {
            this.$auth.setUser({ ...session })
        })

        // const customUser = {
        //     fullName: 'Aus Nieve',
        //     roles: ['user']
        // }

        await this.setToken()

        console.log("user set to", this.$auth.user)
        console.log("user logged in", this.$auth.loggedIn)
    }

    async getUserSession() {

        console.log("getting user session")
    }
}
