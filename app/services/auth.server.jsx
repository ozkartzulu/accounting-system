// app/services/auth.server.ts
import { Authenticator, AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { sessionStorage } from '~/services/session.server';
import { getUser } from '~/models/user.server'

// Create an instance of the authenticator, pass a Type, User,  with what
// strategies will return and will store in the session
const authenticator = new Authenticator(sessionStorage, {
  sessionKey: "sessionKey", // keep in sync
  sessionErrorKey: "sessionErrorKey", // keep in sync
});

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {

    // get the data from the form...
    let username = form.get('username')
    let password = form.get('password')

    // initiialize the user here
    let user = null;

    // do some validation, errors are in the sessionErrorKey
    if (!username || username?.length === 0) throw new AuthorizationError('Nombre de Usuario es requerida')
    if (!password || password?.length === 0) throw new AuthorizationError('Contraseña es requerida')

    // login the user, this could be whatever process you want
    const data = await getUser(username)
    
    if(data[0]){
      let db_username = data[0]?.username
      let db_password = data[0]?.password
      if (username === db_username && password === db_password) {
      
        user = {
          name: username,
          token: password,
        };

      // the type of this user must match the type you pass to the Authenticator
      // the strategy will automatically inherit the type if you instantiate
      // directly inside the `use` method
      return await Promise.resolve({ ...user });
      // return user

      } else {
        // if problem with user throw error AuthorizationError
        throw new AuthorizationError("Accesos Incorrectos")
      }
    }else{
      throw new AuthorizationError("Accesos Incorrectos")
    }
  }),
);

export default authenticator