/**
 * Update the background animation durations based on the slider input.
 * @param {Object} item - The object containing the bksliderinput property.
 * @param {number} [minDuration=1] - The minimum animation duration in seconds.
 * @param {number} [maxDuration=10] - The maximum animation duration in seconds.
 */
export function updateBgDurations(item, minDuration = 1, maxDuration = 10) {
  // Class names to look for
  const bgClasses = ["bg", "bg2", "bg3"];
  
  // Reverse the slider direction to align with the animation
  const reversedValue = 200 - item.bksliderinput;
  
  // Range of possible animation durations
  const durationRange = maxDuration - minDuration;
  
  // Function to calculate animation duration
  const calcDuration = (baseValue, offset = 0) => minDuration + ((baseValue / 200) + offset) * durationRange;
  
  // Iterate through each class name to update its animation duration
  bgClasses.forEach((className, index) => {
    const elements = document.getElementsByClassName(className);
    if (elements.length === 0) {
      console.error(`No elements found with class name: ${className}`);
      return;
    }
    
    const offset = index * 0.05;
    const duration = calcDuration(reversedValue, offset);
    elements[0].style.animationDuration = `${duration}s`;
  });
}