
const beforeShutdown = async () => {
  await new Promise(resolve => {
    setTimeout(resolve, 3000)
  })
  console.log('Awaited end')
}

process.on('SIGINT', async () => {
  console.log('Получен сигнал')
  await beforeShutdown()
  process.exit(0)
})

setTimeout(() => { }, 1_000_000_000)