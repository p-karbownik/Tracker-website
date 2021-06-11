let enableTracking: boolean = false;

export function setEventTrackingEnabled() {
    enableTracking = true;
    console.log('Tracking enabled!');
}
export function setEventTrackingDisabled() {
    enableTracking = false;
    console.log('Tracking disabled!');
}
export function isTrackingEnabled() {
    return enableTracking;
}
