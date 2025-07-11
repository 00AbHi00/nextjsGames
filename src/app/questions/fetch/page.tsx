// export async function getServerSideProps() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
//   .then(()=>
//   {
//     console.log()
//   }).catch(()=>
//   {
//     console.error("errr")
//   });
//   const data = await res.json();

//   return {
//     props: { user: data },
//   };
// }

// export default function Profile({ user }) {
//   return <h1>{user.name}</h1>;
// }
