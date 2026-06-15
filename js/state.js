// Central State Manager
export const state = {
    artworkSrc: 'assets/placeholder-art.svg',
    frameMaterial: 'oak',
    frameThickness: 30,
    mountColor: '#ffffff',
    mountThickness: 60
};

const listeners = [];

export function updateState(newState) {
    Object.assign(state, newState);
    notifyListeners();
}

export function subscribe(listener) {
    listeners.push(listener);
}

function notifyListeners() {
    listeners.forEach(listener => listener(state));
}
