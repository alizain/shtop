'use strict';

var ALLOWED_URL_PATTERNS = [
	new RegExp('^(http|https)://', 'i'),
]

function testURL(url) {
	return ALLOWED_URL_PATTERNS.some(function(regex) {
		return regex.test(url)
	})
}

function stoppedTabs() {

	var _tabs = {}

	function track(tabId) {
		_tabs[tabId] = true
	}

	function forget(tabId) {
		try {
			delete _tabs[tabId]
		} catch (e) {
			console.error(e)
		}
	}

	function includes(tabId) {
		return !!_tabs[tabId]
	}

	return {
		'track': track,
		'forget': forget,
		'includes': includes
	}

}

var STOPPED = stoppedTabs()

function handleCreated(tab) {
	if (!tab.active) {
		STOPPED.track(tab.id)
	}
}

function handleUpdated(tabId, changeInfo, tabInfo) {
  if (STOPPED.includes(tabId) && changeInfo.url !== undefined && testURL(changeInfo.url)) {
    browser.tabs.executeScript(tabId, {
      allFrames: true,
      code: 'window.stop();',
      runAt: 'document_start'
    })
  }
}

function handleActivated(activeInfo) {
	if (STOPPED.includes(activeInfo.tabId)) {
		STOPPED.forget(activeInfo.tabId)
		browser.tabs.reload(activeInfo.tabId)
	}
}

browser.tabs.onCreated.addListener(handleCreated)
browser.tabs.onUpdated.addListener(handleUpdated)
browser.tabs.onActivated.addListener(handleActivated)
