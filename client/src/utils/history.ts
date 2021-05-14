import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
	getUserConfirmation(message, callback) {
		if (ConfirmBeforeLeavePage.confirmBeforeLeave) {
			ConfirmBeforeLeavePage.confirmBeforeLeave(message, callback);
		} else {
			callback(window.confirm(message));
		}
	},
});

type Callback = (ok: boolean) => void;

class ConfirmBeforeLeavePage {
	private static confirmHandler: null | ((cb: Callback) => void) = null;

	static register = (handler: (cb: Callback) => void) => {
		ConfirmBeforeLeavePage.confirmHandler = handler;
	};

	static unregister = () => {
		ConfirmBeforeLeavePage.confirmHandler = null;
	};

	static confirmBeforeLeave = (message: string, callback: Callback) => {
		if (ConfirmBeforeLeavePage.confirmHandler) ConfirmBeforeLeavePage.confirmHandler(callback);
	};
}
