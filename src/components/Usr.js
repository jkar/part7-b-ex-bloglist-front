import React from 'react'


const Usr = ({ b, history, user, logingOut }) => {

  console.log(user)
  //OPWS BLEPW K APO TO LOG EXW AYTO TO IF ETSI WSTE OTAN THA NAI TO PRPOS.USER === NULL NA MH PETAEI ERROR ALLA NA MH GYRNAEI TPT, OTAN TO USER PAREI VALUE THA XANAKANEI RENDER K PLEON TO IF DE THA ISXUEI ,OPOTE THA EMFANISEI TO KATW RETURN!!!
  if (user === null) {
    return null
  }

  const logout2 = () => {
    logingOut()
    history.push('/blogs')
  }

  return (
    <div>
      <p>{user.name} logged in  <button onClick={logout2}>logout</button></p>
      <h4>added blogs</h4>
      <ul>
        {b.map(item => {
          return <li key={item.name}>{item.title}</li>
        })}
      </ul>
    </div>
  )
}

export default Usr