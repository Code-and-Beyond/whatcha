export const TOGGLE_EXAM_LEAVE_MODAL = "TOGGLE_EXAM_LEAVE_MODAL"

export const toggleExamLeaveModal = (visible) => {
	return {
		type: TOGGLE_EXAM_LEAVE_MODAL,
		visible: visible
	}
}