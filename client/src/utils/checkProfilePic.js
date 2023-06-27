/**
 * Check if user has a Google profile picture, otherwise return the user's picture.
 * @param {Object} user - The user object.
 * @returns {string} - The URL of the user's profile picture, or default picture.
 */
export function checkWhichProfilePic(user) {
  if (
    user?.picture?.startsWith("uploads") ||
    user?.picture?.startsWith("/uploads")
  ) {
    return `https://tgram-server.onrender.com/${user.picture}`;
  } else if (user?.googlePicture) {
    return user.googlePicture;
  } else {
    return (
      `https://tgram-server.onrender.com/${user.picture}` ||
      "defaultpicture.png"
    );
  }
}
