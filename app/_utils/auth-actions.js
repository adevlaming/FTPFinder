export async function handleSignIn(gitHubSignIn) {
  try {
    await gitHubSignIn();
  } catch (error) {
    console.log(error);
  }
}

export async function handleSignOut(firebaseSignOut) {
  try {
    await firebaseSignOut();
  } catch (error) {
    console.log(error);
  }
}