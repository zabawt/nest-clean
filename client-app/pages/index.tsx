export default function Home() {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'john',
        password: 'changeme',
      }),
    });
  };

  return (
    <div>
      Login!
      <form onSubmit={handleSubmit}>
        <label htmlFor="uname">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Enter Username" name="uname" required />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
