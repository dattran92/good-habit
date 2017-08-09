const OBJECTIVE_KEY = '@GH_OBJECTIVE';
const TEMP_ACTIVITY_KEY = '@GH_TEMP_ACTIVITY';
const ACTIVITY_KEY = '@GH_ACTIVITY';

function Objective() {
  this.fetch = () => {
    const objectives = JSON.parse(localStorage.getItem(OBJECTIVE_KEY) || '{}');
    return objectives;
  };

  this.save = (key, value) => {
    const index = key || new Date().getTime();
    const objectives = this.fetch();
    objectives[index] = value;
    localStorage.setItem(OBJECTIVE_KEY, JSON.stringify(objectives));
  };

  this.remove = (key) => {
    const objectives = this.fetch();
    delete objectives[key];
    localStorage.setItem(OBJECTIVE_KEY, JSON.stringify(objectives));
    const objectActivity = `${ACTIVITY_KEY}_${key}`;
    localStorage.removeItem(objectActivity);
  };
}

function Activity() {
  this.checkin = (objectiveId, option, startTime) => {
    const currentActivity = {
      objectiveId,
      option,
      startTime,
    };
    localStorage.setItem(TEMP_ACTIVITY_KEY, JSON.stringify(currentActivity));
  };

  this.getCurrentActivity = () => {
    const activity = localStorage.getItem(TEMP_ACTIVITY_KEY);
    return activity ? JSON.parse(activity) : null;
  };

  this.getActivities = (objectiveId) => {
    const dbKey = `${ACTIVITY_KEY}_${objectiveId}`;
    const activities = JSON.parse(localStorage.getItem(dbKey) || '[]');
    return activities;
  };

  this.checkout = (endTime) => {
    const currentActivity = this.getCurrentActivity();
    if (!currentActivity) return;
    currentActivity.endTime = endTime;
    const dbKey = `${ACTIVITY_KEY}_${currentActivity.objectiveId}`;
    const activities = this.getActivities(currentActivity.objectiveId);
    activities.push(currentActivity);
    localStorage.setItem(dbKey, JSON.stringify(activities));
    localStorage.removeItem(TEMP_ACTIVITY_KEY);
  };
}

export default {
  objective: new Objective(),
  activity: new Activity(),
};
