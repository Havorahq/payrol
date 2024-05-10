import React from 'react'

const ProtectedRoute = () => {
    const router = useRouter();
    const { isAuthenticated } = useContext(AuthenticationContext);
  
    let unprotectedRoutes = [appRoutes.SIGNIN_PAGE];
  
    // /**
    //  * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
    //  */
  
    let pathIsProtected = unprotectedRoutes.indexOf(pathname) === -1;
  
    //   if (isBrowser() && !isAuthenticated && pathIsProtected) {
    //     router.push(appRoutes.SIGNIN_PAGE);
    //   }
  
    return children;
}

export default ProtectedRoute