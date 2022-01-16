async function errorCaptured(asyncFunc) {
  try {
    const res = asyncFunc instanceof Promise ? await asyncFunc : await asyncFunc()
    return [null, res]
  } catch (error) {
    return [error, null]
  }
}

export default errorCaptured