/**
 * Timer class
 *
 * @class Timer
 */
export class Timer {
  private start: number
  private end: number | undefined
  constructor() {
    this.start = Date.now()
  }

  /**
   * Start the timer
   *
   * @memberof Timer
   */
  public startTimer() {
    this.start = Date.now()
  }

  /**
   * End the timer
   *
   * @memberof Timer
   */
  public endTimer() {
    this.end = Date.now()
  }

  /**
   * Get the duration of the timer
   *
   * @memberof Timer
   */
  public getDuration() {
    if (this.end)
      return this.end - this.start

    return Date.now() - this.start
  }

  /**
   * Get the duration of the timer in seconds
   *
   * @memberof Timer
   */
  public getDurationInSeconds() {
    return this.getDuration() / 1000
  }
}
