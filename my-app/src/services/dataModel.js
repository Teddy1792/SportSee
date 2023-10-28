export class UserMainData {
        constructor(data) {
            this.id = data.id;
            this.firstName = data.userInfos.firstName;
            this.lastName = data.userInfos.lastName;
            this.age = data.userInfos.age;
            this.todayScore = data.todayScore ?? data.score ?? 0;
            this.keyData = data.keyData || {};
        }
        getFullName() {
            return `${this.firstName} ${this.lastName}`;
        }
        getFirstName() {
            return this.firstName;
        }
    }

export class UserActivity {
    constructor(data) {
        this.userId = data.userId;
        this.sessions = data.sessions || [];
    }

    getSessionOnDate(dateString) {
        return this.sessions.find(session => session.day === dateString) || null;
    }
}

export class UserAverageSessions {
    constructor(data) {
        this.userId = data.userId;
        this.sessions = data.sessions || [];
    }

    getAverageSessionLength() {
        const totalLength = this.sessions.reduce((acc, session) => acc + session.sessionLength, 0);
        return this.sessions.length ? totalLength / this.sessions.length : 0;
    }
}

export class UserPerformance {
    constructor(data) {
        this.userId = data.userId;
        this.kind = data.kind || {};
        this.data = data.data || [];
    }

    getPerformanceByKind(kindId) {
        return this.data.find(performance => performance.kind === kindId) || null;
    }
}
