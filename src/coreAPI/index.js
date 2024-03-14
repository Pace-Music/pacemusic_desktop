class CoreAPI {
  async getData(path, body) {
      try {
          const res = await fetch(`http://188.113.134.168:3000${path}`, {
            body: JSON.stringify(body)
          });

          return await res.json()
      } catch (error) {
          console.error('Ошибка при получении данных:', error);
          throw error;
      }
  }
}

module.exports = {
  CoreAPI: new CoreAPI()
}